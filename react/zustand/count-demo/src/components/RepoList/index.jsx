import { useEffect } from "react";
import { useReposStore } from "../../store/repos";

const RepoList = () => {
    const { repos, loading, error, fetchRepos } = useReposStore();
   
    useEffect(() => {
        fetchRepos()
    }, []) 
    console.log(repos)
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <ul>
                    {
                        repos.map((repo) => (
                            <li key={repo.id}>
                                <a href={repo.html_url} target="_blank" rel="noreferrer">
                                    {repo.name}
                                </a>
                                <p>{repo.description || 'No description'}</p>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

export default RepoList;