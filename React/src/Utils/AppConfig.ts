class DevConfig {
	public readonly loginUrl = "http://localhost:8000/api/login";
    public readonly logoutUrl = "http://localhost:8000/api/logout";
    public readonly vacationsStatusUrl = "http://localhost:8000/api/vacations-status";
    public readonly usersCountUrl = "http://localhost:8000/api/users-count";
    public readonly likesCountUrl = "http://localhost:8000/api/likes-count";
    public readonly likesDistributionUrl = "http://localhost:8000/api/likes-distribution";
    public readonly paradiseVacationsUrl = "http://localhost:5005/vacations";
}

class ProdConfig {
    public readonly loginUrl = "http://54.190.58.9:8000/api/login";
    public readonly logoutUrl = "http://54.190.58.9:8000/api/logout";
    public readonly vacationsStatusUrl = "http://54.190.58.9:8000/api/vacations-status";
    public readonly usersCountUrl = "http://54.190.58.9:8000/api/users-count";
    public readonly likesCountUrl = "http://54.190.58.9:8000/api/likes-count";
    public readonly likesDistributionUrl = "http://54.190.58.9:8000/api/likes-distribution";
    public readonly paradiseVacationsUrl = "http://54.190.58.9:5005/vacations";
}

export const appConfig = new DevConfig();
// export const appConfig = new ProdConfig();
