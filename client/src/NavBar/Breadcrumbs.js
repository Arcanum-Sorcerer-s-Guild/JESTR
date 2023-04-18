import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, i) => {
        currentLink =+ `/${crumb}`

        return (
            <div key={i} className="crumb">
                <Link to={currentLink}>{crumb}</Link>
            </div>
        )
    })

  return (
    <>
      <div className='w-full rounded-md bg-blue px-5'>
        {crumbs}
      </div>
    </>
  );
};

export default Breadcrumbs;
