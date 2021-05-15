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
      url: 'http://openlibrary.org/search.json',
      params: { q: title, publication: publication, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        return [...new Set([...prevBooks, ...res.data.docs.map(b => {
          return {
            title: b.title,
            author: b.author_name ? b.author_name[0] : 'No hay autor registrado',
            publication: b.first_publish_year,
            edition: 2,
            copies: Math.floor((Math.random() * (1 - 1000 + 1)) + 1000),
            imagenUrl: 'https://estaeslalibreria.com/wp-content/uploads/2020/04/Resumen-de-1984-4.jpg',
          }
        }
        )])]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [title, publication,pageNumber])

  return { loading, error, books, hasMore }
}
