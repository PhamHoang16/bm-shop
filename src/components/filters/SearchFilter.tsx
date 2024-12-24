export default function SearchFilter({key, setKey}: {
  key: string,
  setKey: any
}) {
  return <div className="relative flex my-3">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-horizonTeal-500" aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
    </div>
    <input type="search" id="default-search"
           value={key}
           onChange={setKey}
           className="block w-full focus-visible:outline-0 ps-10 p-2 rounded-lg text-sm
                 bg-primary border-borderColor4 border-2 text-textColor1"
           placeholder="Tìm kiếm nhanh"/>
  </div>
}