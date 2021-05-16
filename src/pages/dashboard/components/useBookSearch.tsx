import { useEffect, useState } from 'react'
import axios, { Canceler } from 'axios'

export default function useBookSearch(parm: { title: any; publication: any; pageNumber: any },reload: boolean) {
  const { title, publication, pageNumber } = parm
  
  const [loading, setLoading] = useState<any>(false)
  const [error, setError] = useState<any>(false)
  const [books, setBooks] = useState<any>([])
  const [hasMore, setHasMore] = useState<any>(false)

  useEffect(() => {
    setBooks([])
  }, [title, publication,reload])

  useEffect(() => {
 
    setLoading(true)
    setError(false)
    let cancel: Canceler
    axios({
      method: 'GET',
      url: 'https://littelibrary.herokuapp.com/getAllBooks',
      params: {title:title,publication:publication,num_page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((res):any => {
      setBooks((prevBooks: any) => {
        return [...new Set([...prevBooks, ...res.data.map((b: any) => {
          const {title,author,publication,edition,copies,imagenUrl,bookId}:any =b
          return {
            bookId,
            title,
            author,
            publication,
            edition,
            copies,
            imagenUrl,
          }
        }
        )])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [title, publication,pageNumber,reload])

  return { loading, error, books, hasMore }
}
