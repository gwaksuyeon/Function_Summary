import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
  totalCount: number;
  limit: number;
  pageLimit: number;
  page: number;
  onClickPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  totalCount, // 총 데이터 수
  limit, // 한 페이지에 나타낼 데이터 수
  pageLimit, // 한 화면에 나타낼 페이지 수
  page, // 현재 페이지
  onClickPage,
}) => {
  const totalPageCount = Math.ceil(totalCount / limit); // 총 페이지 수
  const [pageGroup, setPageGroup] = useState<number>(1);
  const [lastPageNumber, setLastPageNumber] = useState<number>(0);
  const [firstPageNumber, setFirstPageNumber] = useState<number>(0);
  const [nextPageNumber, setNextPageNumber] = useState<number>(0);
  const [prevPageNumber, setPrevPageNumber] = useState<number>(0);

  const onCalculation = (currentPage: number) => {
    const pageGroupCnt = Math.ceil(currentPage / pageLimit);

    let last = pageGroupCnt * pageLimit;
    let first = (pageGroupCnt - 1) * pageLimit + 1;
    if (last > totalPageCount) {
      last = totalPageCount;
    }

    let next = last + 1;
    let prev = first - 1;

    setPageGroup(pageGroupCnt);
    setLastPageNumber(last);
    setFirstPageNumber(first);
    setNextPageNumber(next);
    setPrevPageNumber(prev);
  };

  const onClickPrevButton = () => {
    if (prevPageNumber === 0) {
      onClickPage(0);
      onCalculation(1);
    } else {
      onClickPage(firstPageNumber - pageLimit - 1);
      onCalculation(prevPageNumber);
    }
  };

  const onClickNextButton = () => {
    if (nextPageNumber > totalPageCount) {
      onClickPage(totalPageCount - 1);
      onCalculation(totalPageCount);
    } else {
      onClickPage(nextPageNumber - 1);
      onCalculation(nextPageNumber);
    }
  };

  const onClickStartButton = () => {
    onClickPage(0);
    onCalculation(1);
  };

  const onClickEndButton = () => {
    onClickPage(totalPageCount - 1);
    onCalculation(totalPageCount);
  };

  useEffect(() => {
    if (totalPageCount) {
      onCalculation(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPageCount]);

  return (
    <Container>
      <Button
        onClick={prevPageNumber === 0 ? () => {} : onClickStartButton}
      >{`<<`}</Button>
      <Button
        onClick={prevPageNumber === 0 ? () => {} : onClickPrevButton}
      >{`<`}</Button>
      {new Array(lastPageNumber)
        .fill(0)
        .slice(firstPageNumber - 1)
        .map((obj: any, inx: number) => (
          <Button
            key={`page-${inx}`}
            active={page === inx + (pageGroup - 1) * pageLimit}
            onClick={
              page === inx + (pageGroup - 1) * pageLimit
                ? () => {}
                : () => onClickPage(inx + (pageGroup - 1) * pageLimit)
            }
          >
            {inx + 1 + (pageGroup - 1) * pageLimit}
          </Button>
        ))}
      <Button onClick={onClickNextButton}>{`>`}</Button>
      <Button
        onClick={nextPageNumber > totalPageCount ? () => {} : onClickEndButton}
      >{`>>`}</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #e9edf1;
  border-radius: 2px;
  background: ${(props: any) => props.active && "#e9edf1"};
  font-weight: ${(props: any) => props.active && "bold"};
  cursor: pointer;

  & ~ & {
    margin-left: 4px;
  }
`;

export default Pagination;
