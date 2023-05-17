export interface IUser 
{
  teacherId: number,
  categoryName: string,
  statusName: string,
  status: number,
  userName: string,
  userEmail: string,
  eventsByStatus: [
      {
          eventId: number,
          eventName: string,
          eventStatus: string,
          eventCategory: string,
          statusId: number
      }
  ]
}