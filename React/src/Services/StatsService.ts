import axios from "axios";
import { LikesCountModel, LikesDistributionModel, StatsModel, UsersCountModel, VacationsStatusModel } from "../Models/StatsModels";
import { appConfig } from "../Utils/AppConfig";
import { statsActions, store } from "../Redux/State";
import { isEmpty } from 'lodash';
import { getCountryCode } from "../Utils/CountryUtils";

class StatsService {

    // Function returning Promise which reports the main Stats Object.
    // There's an option for the user to press a "Refresh Data" button which sends true to this function:
    public async getAllStats(forceRefresh: boolean = false): Promise<StatsModel> {
        
        const currentTime = new Date();
        const storeStats: StatsModel = store.getState().stats;

        // If there was no force refresh by the user AND
        // If the stats already exist in the global state AND 
        // there hasn't been more than 4 hours since the last update,
        // return the stats that are in the global state:
        if(!forceRefresh && !isEmpty(storeStats) && (currentTime.getTime() - storeStats.lastUpdate < 4 * 3600000)) {
            return storeStats;
        }
        
        // Initialize the stats object as Partial which means each property is initialized with undefined
        const stats: Partial<StatsModel> = {};

        // Fetch each stat individually:
        stats.vacationsStatus = await this.getVacationsStatus();
        stats.usersCount = await this.getUsersCount();
        stats.likesCount = await this.getLikesCount();
        stats.likesDistribution = await this.getLikesDistribution();
        stats.lastUpdate = currentTime.getTime();

        // Convert stats to StatsModel by asserting its type:
        const allStats = stats as StatsModel;

        // Save stats in the global state:
        store.dispatch(statsActions.init(allStats));

        return allStats;
    }
	
    private async getVacationsStatus(): Promise<VacationsStatusModel> {
        const response = await axios.get<VacationsStatusModel>(appConfig.vacationsStatusUrl, {withCredentials:true});
        const stats = response.data;
        return stats;
    }

    private async getUsersCount(): Promise<UsersCountModel> {
        const response = await axios.get<UsersCountModel>(appConfig.usersCountUrl, {withCredentials:true});
        const stats = response.data;
        return stats;
    }

    private async getLikesCount(): Promise<LikesCountModel> {
        const response = await axios.get<LikesCountModel>(appConfig.likesCountUrl, {withCredentials:true});
        const stats = response.data;
        return stats;
    }

    private async getLikesDistribution(): Promise<LikesDistributionModel[]> {
        const response = await axios.get<LikesDistributionModel[]>(appConfig.likesDistributionUrl, {withCredentials:true});
        const stats = response.data;

        // Generate another attribute "country code" for each country in order to later use it for generating flag icons:
        for(let i=0; i<stats.length; i++){
            stats[i].country_code = getCountryCode(stats[i].country_name);
        }
        
        return stats;
    }
}

export const statsService = new StatsService();
