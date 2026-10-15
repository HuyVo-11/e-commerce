import { Link, useLocation } from "react-router-dom";

import styles from './Breadcrumb.module.scss';
const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname
        .split('/')
        .filter(Boolean);

    return (
        <div className={styles.breadcrumb}>
            <Link to='/'>Home</Link>
            {paths.map((path, index)=> {
                const url ='/' + paths
                    .slice(0 , index + 1)
                    .join('/');
                return (
                    <span key={url}>
                        {' / '}
                        {index === paths.length - 1 ? (
                            <span>{path}</span>
                        ) : (
                            <Link to={url}>{path}</Link>
                        )}
                    </span>
                )
            })}
        </div>
    )
}

export default Breadcrumb;