import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props)
    this.handleLike = this.handleLike.bind(this)
    this.handleComment = this.handleComment.bind(this)
  }

  handleLike() {
    const {id} = this.props.unicorn
    try{
      this.props.onClick(id, 'like');
    }catch(e){
      //console.log(e);
    }
  }

  handleComment() {
    const {id} = this.props.unicorn
    try{
      this.props.onClick(id, 'comment');
    }catch(e){
      //console.log(e);
    }
  }

  render() {
    const unicorn = this.props.unicorn
   
    const tags = unicorn.tags.map((tag) => (
      <a key={tag} href="#" className="be-post-tag">{tag}</a>
    ))

    return (
      <div className="be-post">
        <div className="info-block">
          <span><i className="fa fa-tag"></i> {unicorn.price} <i className="fa fa-btc"></i></span>
          <span>fast <i className="fa fa-info-circle"></i><i className="fa fa-venus-mars"></i> {unicorn.reproduction.price} <i className="fa fa-btc"></i></span>
        </div>
        <a href="#" className="be-img-block">
          <img src="img/p1.jpg" alt="omg" />
        </a>
        <a href="page1.html" className="be-post-title">{unicorn.name}</a>
        <span className="just_part">
          <span><i className="fa fa-line-chart"></i> +{unicorn.popularity}</span>
          <span><i className="fa fa-cubes"></i> Gen-{unicorn.generation}</span>
        </span>
        <span>
          {tags}
        </span>
        <div className="author-post">
          <img src="img/a1.png" alt="" className="ava-author" />
          <span>by <a href={unicorn.owner.url}>{unicorn.owner.name} <span><i className="fa fa-globe"></i> {unicorn.country}</span></a></span>
        </div>
        <div className="info-block">
          <span onClick={this.handleLike}><i className="fa fa-heart-o" aria-hidden="true"></i> {unicorn.counters.likes}</span>
          <span><i className="fa fa-eye"></i> {unicorn.counters.views}</span>
          <span onClick={this.handleComment}><i className="fa fa-comment-o"></i> {unicorn.counters.comments}</span>
        </div>
      </div>
    );
  }
}

export default Card;
