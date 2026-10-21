import { Link, useLocation } from "react-router-dom";

import styles from './Breadcrumb.module.scss';
import { ChevronRight } from "lucide-react";
const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname
        .split('/')
        .filter(Boolean);

    if (location.pathname === '/') {
        return null
    }

    return (
        <div className={styles.breadcrumbWrapper}>
            <div className={styles.breadcrumb}>
                <Link to='/'>Home</Link>
                {paths.map((path, index) => {
                    const url = '/' + paths
                        .slice(0, index + 1)
                        .join('/');
                    return (
                        <span key={url} className={styles.breadcrumbItem}>
                            <ChevronRight />
                            {index === paths.length - 1 ? (
                                <span>{path}</span>
                            ) : (
                                <Link to={url}>{path}</Link>
                            )}
                        </span>
                    )
                })}
            </div>
        </div>

    )
}

export default Breadcrumb;