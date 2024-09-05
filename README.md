# 4주차 · Part: 04

### *학습 내용* & *실습*
#### `Map` forEach
```js
db.forEach((value) => {});
```
✨ forEach()를 사용하여 Map의 데이터를 하나씩 꺼내볼 수 있다.
#### `Map` Json 맵핑
```js
let jsonObject = {};

db.forEach((value, key) => {
    jsonObject[key] = value;
});
```
✨ value, key를 받아 jsonObject객체에 하나씩 저장한다.<br>
#### Javascript `forEach` : for + each => 향상된/개선된 for문
```js
arr.forEach((v) => {});
```
> 콜백함수 -> 객체(배열)에서 요소를 하나 꺼낸 다음 실행<br>
> 매개변수 -> *첫번째*: value, *두번째*: index, *세번째*: 객체
#### Javascript `Map`
```js
arr.map(() => {});
```
- map 데이터 전체 삭제
    ```js
    db.clear();
    ```
#### express `DELETE` : 삭제 메소드
```js
app.delete('/post/:id', (req, res) => {});
```
- 예외 처리
    ```js
    const postId = parseInt(req.params.id);

    if (!postId) {
        res.json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    } else {
        db.delete(postId);

        res.json({
            result: true,
            postId: postId,
        });
    }
    ```
#### `리팩토링`
소프트웨어의 코드 내부(구조)를 변경하는 것

    어떻게?

    1. 이해하기 쉽게
    2. 성능
    3. 안정성

> 나쁜 코드 -> 리팩토링 -> 클린 코드

    언제 해야할까?

    1. 에러(문제점)이 n회 발견되었을 때
    2. 리팩토링을 하면서, 에러(문제점)을 발견할 수 있다.
    3. 기능을 추가하기 전
        -> ex. API URL "설계" 수정
    4. 코드 리뷰할 때

    ❗ 배포, 운영 직전에는 절대로 코드 수정이 일어나선 안된다.
#### express `PUT` : 수정 메소드
- req: params.id, body <= title
- res: "~게시글 제목이, ~로 변경되었습니다."
```js
app.put('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    if (!postId) {
        res.json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    } else {
        const post = db.get(postId);
        const oldTitle = post.title;
        if (!post) {
            res.json({
                result: false,
                message: '게시글이 존재하지 않습니다.',
            });
        } else {
            const newTtitle = req.body.title;

            post.title = newTtitle;
            db.set(postId, post);

            res.json({
                result: true,
                message: `${oldTitle}게시글 제목이, ${newTtitle}로 변경되었습니다.`,
            });
        }
    }
});
```
#### HTTP `상태 코드`
- 조회/수정/삭제 성공: 200
- 등록 성공: 201
- 찾는 페이지 없음: 404
- 서버가 죽었을 때: 500