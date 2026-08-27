async function getBlogs() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Thai');

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return Response.json(data);


}

export default async function Page() {
    const blogs = await getBlogs();
    console.log('blogs', blogs);
    return (
        <div>
            <h1>API Test</h1>
            <p>This is a test page for the API route.</p>
        </div>
    );
}

