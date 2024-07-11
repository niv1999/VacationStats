export class VacationsStatusModel {
    public past_vacations: number;
    public ongoing_vacations: number;
    public future_vacations: number;
}

export class UsersCountModel {
    public users_count: number
}

export class LikesCountModel {
    public likes_count: number
}

export class LikesDistributionModel {
    public country_name: string
    public likes: number
    public country_code: string
}

export class StatsModel {
    public vacationsStatus: VacationsStatusModel;
    public usersCount: UsersCountModel;
    public likesCount: LikesCountModel;
    public likesDistribution: LikesDistributionModel[];
    public lastUpdate: number;
}