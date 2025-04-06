// enum EtreansactionType {
//     Withdraw = 1,
//     Discount = 2
// }


export type Transaction = {
    id: string;
    title: string;
    type: number; 
    amount: number;
    consumer: number;
    pay: boolean; 


    category_id: string;
    paidOrReceivedAt: Date;
  };

  export default class CreateTransactionRequest {
    title: string = '';
    //description: string = '';
    tipo: number = 0; 
    amount: number = 0;
    categoryId: number = 0;
    paidOrReceivedAt: Date = new Date();
    consumer: number = 0;
    pay: boolean = false;
  }

  export  class CreateParametrosTransactionRequest {
    startDate: Date = new Date();
    endDate: Date = new Date();
    
  }

  export type ParamTransaction = {
    startDate: string;
    endDate: string;

  }

  export interface TagResponse {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
    data: Transaction[]
    message: string;
  }
