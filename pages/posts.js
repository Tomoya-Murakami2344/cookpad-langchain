export default function index({posts}){
    return (
        <div>
          <h1>POST一覧</h1>
          <ul>
            {posts.map((post) => {
                return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
        </div>
      );
}
export async function getServerSideProps() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await res.json();
    return { props: { posts } };
}