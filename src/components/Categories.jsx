import { useContext } from "react"
import { Data } from "./Page"
import { Link } from "react-router-dom";

const Categories = function() {
  const { categories } = useContext(Data);

  return (
    <div>
      {categories && categories.map((category) => (
        <Link to={`/blog/categories/${category._id}`} key={category._id}>{category.name}</Link>
      ))}
    </div>
  )
}

export default Categories;