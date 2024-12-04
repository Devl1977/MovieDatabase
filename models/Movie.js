const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    adult: {
        type: Boolean,
        required: true
    },
    backdrop_path: {
        type: String,
        required: true
    },
    genre_ids: {
        type: Array,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    original_language: {
        type: String,
        required: true
    },
    original_title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    video: {
        type: Boolean,
        required: true
    },
    vote_average: {
        type: Number,
        required: true
    },
    vote_count: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;
