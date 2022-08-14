import React , {Component} from 'react'
import {getMovies} from '../services/movieData'
import '../services/movie.scss';
import swal from 'sweetalert';
import Pagination from '../common/pagination'
import {paginate} from '../utils/pagination'
class Movie extends Component{
constructor(){
    super();

    this.state = {
        movies : getMovies(),
        pageSize:3,
        currentPage:1
    }
}
onPageChange =(page)=>{
//  console.log(event.target)
 this.setState({currentPage:page})
}
handle = (movie)=>{
    // console.log(movie)
    // const movies = this.state.movies.filter(m =>m.imdbID !== movie.imdbID)
    // console.log(movies)
    // this.setState({ movies : movies })
    swal("Good job!", "You clicked the button!", "success");
    swal({
        text: 'Search for a movie. e.g. "La La Land".',
        content: "input",
        button: {
          text: "Search!",
          closeModal: false,
        },
      })
      .then(name => {
        if (!name) throw null;
       
        return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
      })
      .then(results => {
        return results.json();
      })
      .then(json => {
        const movie = json.results[0];
       
        if (!movie) {
          return swal("No movie was found!");
        }
       
        const name = movie.trackName;
        const imageURL = movie.artworkUrl100;
       
        swal({
          title: "Top result:",
          text: name,
          icon: imageURL,
        });
      })
      .catch(err => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
}
render(){
  const {length:count} = this.state.movies
  const {movies:allMovies,pageSize,currentPage} = this.state

  const movies =paginate(allMovies,currentPage,pageSize)
    return(
      
          <React.Fragment>
            <h4>showing movies {this.state.movies.length}</h4>
  <div className="container">
     <br></br>
    <table className="table table-responsive table-hover ">
        <thead className="bg-primary">
            <tr>
            <th>Title</th>
            <th>IMDB ID</th>
            <th>Year</th>
            <th>Poster</th>
            <th>Search</th>
            </tr>
        </thead>
    <tbody>
        {
        movies.map((movie,index)=>(
            <tr key={movie.imdbID}>
            <td>{movie.Title}</td>
            <td>{movie.imdbID}</td>
            <td>{movie.Year}</td>
            <td><img src={movie.Poster} alt="image"></img></td>
            <td><button onClick={()=>this.handle()} type="button" className="btn btn-danger">Search</button></td>
            </tr>
        ))
        }
    </tbody>
       </table>
       <Pagination  itemsCount = {count}
        pageSize= {pageSize}
        currentPage={currentPage}
        onPageChange ={this.onPageChange}/>
    </div>
          </React.Fragment>
        )
    }
}
export default Movie;
