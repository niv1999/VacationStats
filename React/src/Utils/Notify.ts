import { Notyf } from "notyf";

class Notify {

	private notyf = new Notyf({
        duration: 3000,
        position: {x: "center", y: "top"},
        dismissible: true
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notyf.error(message);
    }

    private extractErrorMessage(err: any): string {
        if(typeof err === "string" && err !== "") return err;
        if(typeof err?.response?.data?.error === "string" && err?.response?.data?.error !== "") return err.response.data.error;
        if(typeof err?.message === "string" && err?.message !== "") return err.message;
        return "Some error occurred, please try again.";    
    }
}

export const notify = new Notify();
