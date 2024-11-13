// enum EtreansactionType {
//     Withdraw = 1,
//     Discount = 2
// }

export interface CreateTransactionRequest {
    id: string;
    title: string;
    // description: string;
    tipo: number; 
    amount: number;
    categoryId: number;
    paidOrReceivedAt: Date;
    consumer: number;
    pay: boolean;
  }
  
  const API_URL = 'http://localhost:5250/v1';
  export async function createTransaction({
    title,
    tipo,
    amount,
    categoryId,
    paidOrReceivedAt,
    consumer,
    pay,
    
  }: CreateTransactionRequest): Promise<void> {

    console.log(categoryId);
    const response = await fetch(API_URL+'/transactions', {
       method: 'POST',
       headers: {
         'Accept': 'application/json, text/plain',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         title,
    //     description,
         type: tipo,
         Amount: amount,
         consumer: consumer,
         pay: pay,
         categoryId,
         paidOrReceivedAt: paidOrReceivedAt,
       }),
     })
  
    if (!response.ok) {
      throw new Error('Error while creating the goal')
    }
  }