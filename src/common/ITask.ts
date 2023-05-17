export interface ITask {
    categoryId: string,
    categoryName: string,
    statuses: [
        {
            statysId: number,
            statusName: string,
            statusCategory: string,
            events: [
                {
                    eventId: number,
                    eventName: string,
                    eventStatus: string,
                    eventCategory: string,
                    statusId: number,
                }
            ]
        }
    ] 
}