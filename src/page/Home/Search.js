import React,{useState,useEffect,useCallback} from 'react';


const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);
// function  SearchBar() {
//     const [search, setSearch] = useState("");
//     function onKeyUpHandler(e) {
//         setSearch(e.target.value.toLowerCase());
//       }
//     return(
//         <div className="mb-3">
//             <h1>Filter Blogs</h1>
//             <label className="form-label">Filter List</label>
//             <input
//             id="searchFilter"
//             type="text"
//             className="form-control"
//             defaultValue={search}
//             placeholder="Enter ID or Name"
//             onKeyUp={onKeyUpHandler}
//             />
//         </div>
//     )
// }

export default SearchBar;