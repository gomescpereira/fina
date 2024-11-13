//import { useQuery } from "@tanstack/react-query"
import { Header } from '../Components/header'
import { Tabs } from '../Components/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table';
//import { Button } from '../Components/ui/button';
//import { Plus, Search, Filter, FileDown, MoreHorizontal, Loader2, Edit } from 'lucide-react'
// import { MoreHorizontal  } from 'lucide-react'
import {  useNavigate } from 'react-router-dom';
import { useCategoryData } from "../hooks/useCategoryData";
import { Carregando } from "../Components/carregando";
import { Pencil } from 'lucide-react';

export interface TagResponse {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
    data: Category[]
    message: string;
  }

  export interface Category {
    id: number
    title: string
    description: string
    userId: string
  }


export function ListCategories() {

    const navigate = useNavigate()

    const {data: tagsResponse, isLoading} = useCategoryData();
    // const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    //     queryFn: async () => {
    //        const response =  await fetch('http://localhost:5250/v1/categories?pageNumber=1&pageSize=10')

    //        const data = response.json()
    //        console.log(data)
    //        return data
    //     },
    //     queryKey: ['get-categories']
    // })

    const handleEdit = (id: number) => {
      console.log(`Edit item with id: ${id}`);
      // Adicione aqui a lógica para editar o item
      navigate(`/category/${id}`);
    };

  
    //const handleDelete = (id) => {
    //   console.log(`Delete item with id: ${id}`);
    //   setItems(items.filter(item => item.id !== id));
    //};
  

    // const handleEditCategory = (
    //    e: MouseEvent<HTMLButtonElement>): void => {
    //    e.preventDefault();
       
    //    console.log();
    //     navigate('/category/25}');
    // }

    if (isLoading) {
        return <Carregando />
        
    }

    return (
      <div className="py-10 space-y-8">
        <div>
         <Header />
         <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          {/* <h1 className="text-xl font-bold">Tags</h1> */}
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Categorias</TableHead>
              <TableHead>Descrição das categorias</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.title}</span>

                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.description}
                  </TableCell>
                  <TableCell className="text-right gap-2">
                    
                    <button 
                    type="submit"
                        onClick={() => handleEdit(tag.id)} 
                         className="gap-5">
                        <Pencil className="bg-orange-400 text-orange-950 size-4 rounded"   />
                    </button>
                    {/* <button 
                    type="submit"
                        onClick={() => handleDelete(tag.id)} 
                        //onClick={handleEditCategory}
                        className="size-2"  >
                        <Trash className="size-4"/>
                    </button> */}
                    {/* onClick={handleEditCategory(tag.id)}  */}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        </div>
        </main>
    </div>
    )

}