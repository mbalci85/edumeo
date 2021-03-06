import SinglePost from './SinglePost';
import './Posts.css';

const Posts = ({ posts, setPage, page, numberOfPages, userName }) => {
	return (
		<div className='home-page-all-posts-container'>
			<h1 className='home-page-all-posts-title'>Recent Posts</h1>
			<div className='home-page-all-posts-go-to-page-container'>
				<label
					htmlFor='home-page-all-posts-go-to-page-input'
					className='home-page-all-posts-go-to-page-label'>
					Page <strong>{page}</strong>
				</label>
				<div>
					1{' '}
					<input
						id='home-page-all-posts-go-to-page-input'
						type='range'
						min='1'
						max={numberOfPages.toString()}
						value={page}
						className='home-page-all-posts-go-to-page-input'
						onChange={(e) => {
							setPage(e.target.value);
							e.preventDefault();
						}}
					/>{' '}
					{numberOfPages}
				</div>
			</div>

			{posts.length !== 0 &&
				posts.map((post) => (
					<SinglePost post={post} key={post._id} userName={userName} />
				))}
		</div>
	);
};

export default Posts;
