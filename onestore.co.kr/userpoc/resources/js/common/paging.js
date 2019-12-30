/**
 * 공통 페이징 JS
 */
function renderPagingInfo( offset, count ) { 

    var totalRecode = count;  //총게시물 수
    var recordSize  = 10; //한페이지당 보여줄 게시물 수
    var currentPage = offset; // 보고있는 페이지 번호
    var blockSize   = 10; //보여질 페이지 갯수

    var firstBlock = currentPage - ((currentPage-1)%blockSize); //시작 번호
    var lastBlock = firstBlock + (blockSize-1); // 끝 번호
    
    var pageCnt = totalRecode / recordSize;
    if( totalRecode % recordSize > 0 ) pageCnt++
    pageCnt = Math.floor(pageCnt);
    
    var html = "";
    html += "<div class='paging'>";
    if (currentPage-10 >= 1){
        html += "<span class='btnPrev' title='이전 페이지'><a href='#' onclick='goPageCommonReply("+( firstBlock - 1)+")'>이전</a></span>";/* 이전 활성 */
    }
    if (currentPage-10 < 1){
        html += "<span class='btnPrev' title='이전 페이지'><a href='javascript:void(0)'>이전</a></span>";/* 이전 비활성 */
    }
    html += "<span class='num'>";
    for ( var int = 0; int < blockSize; int++) {
        if( (firstBlock + int) <= pageCnt ){
            if( (firstBlock + int) == currentPage ){
                html += "<a title='" + ( firstBlock + int) +"페이지로 이동' href='#' class='on' onclick='goPageCommonReply("+( firstBlock + int)+")' ><em>" + ( firstBlock + int) +"</em></a>";
            }else{
                html += "<a title='" + ( firstBlock + int) +"페이지로 이동' href='#' onclick='goPageCommonReply("+( firstBlock + int)+")' ><em>" + ( firstBlock + int) +"</em></a>";
            }
        }
    }
    if( (firstBlock+blockSize) <= pageCnt ){
        html += "<span class='btnNext' title='다음 페이지'><a href='#' onclick='goPageCommonReply("+( lastBlock + 1 )+")'>다음</a></span>";
    }
    if( (firstBlock+blockSize) > pageCnt ){
        html += "<span class='btnNext' title='다음 페이지'><a href='javascript:void(0)'>다음</a></span>";
    }
	html += "</div>";
    
    $("#pagingWrap").html(html);
    
}