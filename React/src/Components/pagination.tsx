import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
//import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'

interface PaginationProps {
  pages: number // numeros de páginas
  items: number  // total de itens
  page: number // pagina corrente
}

export function Pagination({ items, page, pages }: PaginationProps) {
  const [, setSearchParams] = useSearchParams();

  //console.log(SearchParams)
  console.log(items, page, pages );

//   const hanleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     console.log(`Opção selecionado: ${event.target.value} `)
//   //   setSearchParams(params => {
//   //     params.set('pagsize', String(event.target.value))
//   // }
// }

 const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     //setSelectedOption(event.target.value);
     console.log(event.target.value)
  }

 
  function firstPage() {
    console.log("entrou aqui", page);
    setSearchParams(params => {
      params.set('page', '1')
      console.log("Próxina", {params});
      return params
    })
  }

  function previousPage() {
   // console.log("entrou aqui");
    if (page - 1 <= 0) {
    
      return
    }

    setSearchParams(params => {
      params.set('page', String(page - 1))
      console.log("Próxina", {params});
      return params
    })
  }

  function nextPage() {
   // console.log("entrou aqui", page);
    if (page + 1 > pages) {
      return
    }

    setSearchParams(params => {
      page++
      params.set('page', String(page))

      return params
    })
  }

  function lastPage() {
    console.log("entrou aqui", page);
    setSearchParams(params => {
      params.set('page', String(pages))
 // page -<> pagNynber
      return params
    })
  }

  return (
    <div className="flex text-sm items-center justify-between text-zinc-300">
      <span>Showing 10 of {items} items</span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <select onChange={handleChange}>
            <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
           </select>
   
         {/* <Select defaultValue="10" > 
            <SelectTrigger aria-label="Page" />
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>  */}
        </div>

        <span>Page {page} of {pages}</span>

        <div className="space-x-1.5">
          <Button onClick={firstPage} size="icon"  disabled={page - 1 <= 0}  >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button onClick={previousPage} size="icon" disabled={page - 1 <= 0}  >
          {/* disabled={page - 1 <= 0} */}
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button onClick={nextPage} size="icon" disabled={page + 1 > pages}  >
          {/* disabled={page + 1 > pages} */}
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button onClick={lastPage} size="icon" disabled={page + 1 > pages} >
          {/* disabled={page + 1 > pages} */}
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
