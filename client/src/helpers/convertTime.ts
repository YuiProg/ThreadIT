class convertTime {

    public ConvertDate (date: string) : string {
        return new Date(date).toLocaleTimeString("en-US",{
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            month: "2-digit",
            day: "2-digit",
            year: "2-digit"
        });
    }
}

export default convertTime