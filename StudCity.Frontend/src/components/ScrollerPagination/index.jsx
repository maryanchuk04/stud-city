import React, { useRef, useEffect, useState } from 'react';
import Spinner from '../Spinner';

const ScrollerPagination = ({
	loading,
	data,
	ItemComponent,
	handleClick,
	handleDispatch,
	searchData,
	selectedItems = []
}) => {
	const containerRef = useRef(null);
	const [indexPage, setIndexPage] = useState(1);
	const [datas, setDatas] = useState([]);
	const [totalItemsCount, setTotalItemsCount] = useState(0);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener('scroll', handleScroll);
			}
		};

	}, [containerRef.current, loading])

	useEffect(() => {
		if (indexPage > 1 && (totalItemsCount / (10 * (indexPage - 1))) > 1) {
			handleDispatch(indexPage, searchData);
		}
	}, [indexPage])

	useEffect(() => {
		setDatas([])
		setIndexPage(1)
		handleDispatch(1, searchData)
	}, [searchData])

	useEffect(() => {
		if (data?.items?.length === 0) {
			setDatas([])
		}
		if (data.items?.length > 0) {
			setDatas(prev => [...prev, ...data.items])
			if (indexPage === 1) {
				setDatas(data.items)
				setTotalItemsCount(data.pageViewModel.totalItemsCount)
			}
		}
	}, [data.items])

	const handleScroll = () => {
		if (containerRef.current) {
			if ((containerRef.current.clientHeight + containerRef.current.scrollTop > containerRef.current.scrollHeight - 1) && !loading) {
				setIndexPage((prev) => prev + 1);
			}
		}
	};
	return (
		<div ref={containerRef} className='h-full w-full overflow-y-auto'>
			{indexPage === 1 && loading
				? <Spinner />
				: (
					datas?.length > 0
						? <div className="h-fit">
							{datas?.map((elem) => (
								<ItemComponent
									user={elem}
									key={elem.id}
									onClick={() => handleClick(elem)}
									className={selectedItems?.some(item => item.id === elem.id) ? 'bg-customGreen' : ''}
								/>
							))}
							{indexPage > 1 && loading && (<div className="h-24 flex w-full">
								<Spinner />
							</div>)}
						</div>
						: <div className="w-full h-full flex"><p className="m-auto">Nothing found</p></div>
				)
			}
		</div >
	)
}

export default ScrollerPagination