import { http, HttpResponse  } from 'msw';
import { setupServer  } from 'msw/node';
import { DefaultBodyType,  PathParams } from 'msw';

const API_URL = 'http://192.168.0.20:8080/v1';

export const handlers = [
  // Mock para listar transações
  rest.get(`${API_URL}/transactions`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        currentPage: 1,
        totalPages: 2,
        pageSize: 10,
        totalCount: 15,
        data: [
          {
            id: '1',
            title: 'Test Transaction',
            type: 1,
            amount: 100,
            consumer: 1,
            pay: true,
            category_id: '1',
            paidOrReceivedAt: new Date().toISOString(),
          },
        ],
        message: 'Success',
      })
    );
  }),

  // Mock para categorias
  rest.get(`${API_URL}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 2,
        data: [
          {
            id: '1',
            title: 'Test Category',
            description: 'Test Description',
            userId: '1',
          },
        ],
        message: 'Success',
      })
    );
  }),

  // Mock para relatórios
  rest.get(`${API_URL}/reports/summary`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          userId: '1',
          incomes: 1000,
          expenses: 500,
          total: 500,
        },
        message: 'Success',
      })
    );
  }),
];

export const server = setupServer(...handlers);
