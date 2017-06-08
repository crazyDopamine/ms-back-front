export class TableOptions {
    pageSize=10;
    add=false;                                      //换页时当前数据不清除,默认为清除
    cbr=false;                                      //clear before refresh
    loadAnimate=false;                              //加载动画
    setPageSize(pageSize:number){
        this.pageSize = pageSize;
        return this;
    }
    setAdd(add:boolean){
        this.add = add;
        return this;
    }
    setCbr(cbr:boolean){
        this.cbr = cbr;
        return this;
    }
    setLoadAnimate(loadAnimate:boolean){
        this.loadAnimate = loadAnimate;
        return this;
    }
}
