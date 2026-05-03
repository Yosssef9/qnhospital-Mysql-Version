import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbArea({ imgUrl, items }) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const formatLabel = (text) => {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const autoItems = [
    { label: "Home", to: "/" },
    ...paths.map((path, index) => {
      const fullPath = "/" + paths.slice(0, index + 1).join("/");
      return {
        label: formatLabel(decodeURIComponent(path)),
        to: fullPath,
      };
    }),
  ];

  const breadcrumbItems = items?.length ? items : autoItems;

  return (
    <div className="w-full">
      <div className="w-full">
        <img
          className="w-full object-contain object-center"
          src={imgUrl}
          alt="breadcrumb background"
        />
      </div>

      <div className="flex w-full items-center justify-center bg-[#f7f7f7] py-3 border-y border-[rgba(21,98,160,0.15)]">
        <nav aria-label="breadcrumb" className="text-sm text-gray-700">
          <ol className="flex flex-wrap items-center font-sans">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <li
                  key={`${item.label}-${index}`}
                  className="flex items-center"
                >
                  {index > 0 && <span className="mx-2 text-gray-500">/</span>}

                  {isLast || !item.to ? (
                    <span className="font-main text-black transition-all duration-300">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.to}
                      className="inline-block text-black transition-all duration-300 hover:text-[var(--main-color)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
