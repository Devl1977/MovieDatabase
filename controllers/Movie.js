const MovieModel = require('../models/Movie');

const getAllMovies = async(req, res) => {
    try {
        const allMovie = await MovieModel.find();
        return res.status(200).json({
            status: 200,
            success: true,
            movies: allMovie
        })
        
    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `No movies found!`
        })
    }
}


const getOneMovie = async(req, res) => {
    const { id } = req.params;

    try {
        const singleMovie = await MovieModel.findById(id);
        if(singleMovie) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: `Movie found!`,
                expense: singleMovie
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `Movie id: '${id}' does not exist!`
        })
    }
}

const deleteAMovie = async(req, res) => {
    const { id } = req.params;

    try {
        const singleMovie = await MovieModel.findByIdAndDelete(id);
        return res.status(200).json({
            status: 200,
            success: true,
            message: `Movie '${id}' successfully deleted!`,
            data: singleExpense
        })

    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `Failed to delete movie id: '${id}'!`
        })
    }
}

const createMovie = async(req, res) => {
    const { adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count} = req.body;
    const newMovie = new MovieModel({
        adult,
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count
    })

    try {
        const movieToCreate = await newMovie.save();
        return res.status(201).json({
            status: 200,
            success: true,
            movie: movieToCreate
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: `Movie: '${title}' was not created!`
        })
    }
}


module.exports = {
    getAllMovies,
    getOneMovie,
    createMovie,
    deleteAMovie
}
