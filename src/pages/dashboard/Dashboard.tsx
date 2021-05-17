import { useState, useRef, useCallback } from "react";
import {
  Grid,
  Button
} from "@material-ui/core";
import {
  Search as SearchIcon,
} from "@material-ui/icons";
import CardBook from "./components/cardBook/cardBook";
import useBookSearch from "./components/useBookSearch";
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { Typography } from "../../components/Wrappers/Wrappers";
import Dialog from '@material-ui/core/Dialog';
import DialogCustom from '../../components/Dialog/DialogCustom'

export default function Dashboard() {
  const [parm, setParm] = useState({
    title: '',
    publication: '',
    pageNumber: 1,
  })
  const [reload, setReload] = useState(false)
  const {
    books,
    hasMore,
    loading,
  } = useBookSearch(parm, reload)


  const [isOpenNewBook, setIsOpenNewBook] = useState(false)
  const observer: any = useRef()


  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setParm({ ...parm, pageNumber: parm.pageNumber + 1 })
      }
    })
    if (node) observer.current.observe(node)
    // eslint-disable-next-line
  }, [loading, hasMore])

  function handleSearch(e: { target: { name: any; value: any; }; }) {
    const { name, value } = e.target
    setParm({ ...parm, [name]: value, pageNumber: 1 })
  }
  function onlyNumber(e: any) {
    const key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }
  return (
    <>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField
            value={parm.title}
            name='title'
            onChange={handleSearch}
            placeholder="Escribe cualquier cosa"
          />
        </Grid>
        <Grid item>
          <TextField
            onKeyPress={(e) => onlyNumber(e)}
            value={parm.publication}
            name='publication'
            onChange={handleSearch}
            placeholder="Año de Publicación"
          />
        </Grid>
        <div style={{ marginLeft: '20px' }}>
          <Button variant="contained" onClick={() => { setIsOpenNewBook(true) }} color="primary">
            Agregar uno Nuevo
          </Button>
        </div>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        {books.map((item:any, index:any) => {
          if (books.length === index + 1) {
            return <Grid item md={4} sm={6} xs={12} key={index}>
              <div ref={lastBookElementRef} key={index}>
                <CardBook
                  setParm={() => {
                    setReload(!reload)
                    setParm({
                      title: '',
                      publication: '',
                      pageNumber: 1,
                    })
                  }}
                  {...item} />
              </div>
            </Grid>
          } else {
            return <Grid item md={4} sm={6} xs={12} key={index}>
              <div key={index}>
                <CardBook
                  setParm={() => {
                    setReload(!reload)
                    setParm({
                      title: '',
                      publication: '',
                      pageNumber: 1,
                    })
                  }}
                  {...item} />
              </div>
            </Grid>
          }
        })}
      </Grid>
      <br></br>
      <br></br>
      {loading && (
        <div>
          <CircularProgress
            variant="indeterminate"
            disableShrink
            size={40}
            thickness={4}
          />
        </div>
      )}
      {!loading && !books.length && (
        <Typography variant="h6" weight="medium" size colorBrightness color>
          No existen Libros
        </Typography>
      )}
      {isOpenNewBook && (
        <Dialog aria-labelledby="customized-dialog-title" open={isOpenNewBook}>
          <DialogCustom
            data={[]}
            setParm={() => {
              setReload(!reload)
              setParm({
                title: '',
                publication: '',
                pageNumber: 1,
              })
            }}
            onclose={() => setIsOpenNewBook(false)}
          />
        </Dialog>

      )}
    </>
  )
}