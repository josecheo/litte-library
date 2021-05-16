import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(parm) {
  const { title, publication, pageNumber } = parm
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [title, publication])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'http://localhost:4000/getAllBooks',
      params: {title:title,publication:publication,num_page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        return [...new Set([...prevBooks, ...res.data.map(b => {
          const {title,author,publication,edition,copies,imagenUrl} =b
          return {
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
  }, [title, publication,pageNumber])

  return { loading, error, books, hasMore }
}
