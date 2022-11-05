async function selectProduct() {
    
    const entireRow = document.querySelector(`.${this.id}`);

    const productContainer = document.querySelector('.section-container');

    const check = confirm(`상품 정보 삭제 시 복구할 수 없습니다. 정말로 삭제하시겠습니까?`);
    
    if (check) {
        productContainer.removeChild(entireRow);

        const productId = this.id.slice(7);
        const data = { productId };
        const result = await Api.delete(
            '',
            `api/admin/product/${productId}`,
            data,
        );

        if (result) {
            alert('삭제가 완료되었습니다.');
        }
        closeModal();
    } else{
        closeModal();
    }
}
