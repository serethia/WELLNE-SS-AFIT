package com.ssafy.pjt.util;

public class PageNavigation {
	/** PageNation에서 보여줄 페이지 목록의 시작 번호 */
	private int startPage;
	/** PageNation에서 보여줄 페이지 목록의 마지막 번호 */
	private int endPage;
	/** PageNation의 '이전'버튼이 클릭될 때 1페이지로 갈 것인지, startPage의 앞으로 갈것인지 */
	private boolean startRange;
	/** PageNation의 '다음'버튼이 클릭될 때 마지막 페이지로 갈 것인지, endPage의 뒤로 갈것인지 */
	private boolean endRange;
	/** 검색된 전체 데이터의 개수 */
	private int totalCount;
	/** 전체 페이지 개수 */
	private int totalPageCount;
	/** 현재 페이지 번호 */
	private int currentPage;
	/** 한 페이지에 보여줄 데이터의 개수 */
	private int countPerPage;
	/** 한 페이지에 보여줄 아이템의 개수이다. */
	int itemPerPage = 10;
	/** 한 화면에 만들 navigation link의 최대 개수를 설정한다. */
	int maxDisplayNavCnt = 10;

	public PageNavigation(int currentPage, int totalCount) {
		makePageNavigation(currentPage, totalCount);
	}

	public boolean isStartRange() {
		return startRange;
	}

	public void setStartRange(boolean startRange) {
		this.startRange = startRange;
	}

	public boolean isEndRange() {
		return endRange;
	}

	public void setEndRange(boolean endRange) {
		this.endRange = endRange;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getCountPerPage() {
		return countPerPage;
	}

	public void setCountPerPage(int countPerPage) {
		this.countPerPage = countPerPage;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	/**
	 * 페이징에 필요한 속성들을 구성하는 함수이다.
	 * 
	 * @param currentPage
	 * @param totalCount
	 */
	private void makePageNavigation(int currentPage, int totalCount) {
		// pageNation의 currentPage를 설정한다.
		this.setCurrentPage(currentPage);
		// pageNation의 totalCount를 설정한다.
		this.setTotalCount(totalCount);
		// pageNation의 countPerPage를 설정한다.
		this.setCountPerPage(maxDisplayNavCnt);

		// totalPageCount를 계산한다.
		int totalPageCount = (totalCount - 1) / itemPerPage + 1;
		// pageNation의 totalPageCount를 설정한다.
		this.setTotalPageCount(totalPageCount);

		// pageNavigation의 시작 페이지를 계산해서 설정한다.
		this.setStartPage((currentPage - 1) / maxDisplayNavCnt * maxDisplayNavCnt + 1);

		// pageNavigation의 endPage를 계산해서 설정한다.
		this.setEndPage(this.getStartPage() + maxDisplayNavCnt - 1);
		// 만약 totalPageCount가 위에서 계산한 값보다 작다면 totalPageCount로 설정한다.
		System.out.println(totalPageCount);
		if (totalPageCount < this.getEndPage()) {
			this.setEndPage(totalPageCount);
		}
		// pageNation의 startRange를 계산해서 설정한다.
		this.setStartRange(currentPage <= maxDisplayNavCnt);
		// pageNation의 endRange를 계산해서 설정한다.
		boolean endRange = (totalPageCount - 1) / maxDisplayNavCnt * maxDisplayNavCnt < currentPage;
		this.setEndRange(endRange);
	}
	
	
//	//강사님이 해주셨던 옛날 코드..
//    // 이 2개가 정해지면 나머지는 정해짐.
//    private int currentPage;
//    private int totalItemCount;
//        
//    private final int itemPerPage = 10;
//    private final int pagePerGroup = 5; 
//    
//    public int getCurrentPage() {
//        return currentPage;
//    }
//
//    public void setCurrentPage(int currentPage) {
//        this.currentPage = currentPage;
//    }
//
//    public int getTotalItemCount() {
//        return totalItemCount;
//    }
//
//    public void setTotalItemCount(int totalItemCount) {
//        this.totalItemCount = totalItemCount;
//    }
//
//    // Total Page Count = Last Page Num.
//    public int getTotalPageCount() {
//        return (totalItemCount - 1) / itemPerPage + 1;
//    }
//    
//    private int getTotalGroupCount() {
//        return (getTotalPageCount() - 1) / pagePerGroup + 1;
//    }
//    
//    public int getCurrentGroup() {
//        return (currentPage -1 ) / pagePerGroup + 1;
//    }
//    
//    public int getStartPage() {
//        return (getCurrentGroup() - 1) * pagePerGroup + 1;
//    }
//    
//    public int getEndPage() {
//        if(getCurrentGroup() == getTotalGroupCount()) 
//            return getTotalPageCount();// Last Page Num 반환
//        else
//            return (getCurrentGroup() - 1) * pagePerGroup + pagePerGroup;
//    }
//
//    public boolean getFirstPageAvailable() {
//        return currentPage != 1;
//    }
//    
//    public boolean getPreviousPageAvailable() {
//        return currentPage > 1;
//    }
//    
//    public boolean getLastPageAvailable() {
//        return currentPage < getTotalPageCount();
//    }
//    
//    public boolean getNextPageAvailable() {
//        return currentPage < getTotalPageCount();
//    }
//	
	
}