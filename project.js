const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let db = new Map();
let dbIndex = 1;

app.get('/', (req, res) => {
    res.send('Chan Board');
});

app.post('/upload', (req, res) => {
    //게시글 업로드
    db.set(dbIndex++, req.body);

    res.json({
        result: true,
        uploadData: req.body,
    });
});

app.get('/post/:id', (req, res) => {
    //게시글 조회
    const postId = parseInt(req.params.id);
    if (!postId) {
        res.json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    } else {
        const postData = db.get(postId);
        if (!postData) {
            res.json({
                result: false,
                message: '게시글이 존재하지 않습니다.',
            });
        } else {
            res.json({
                result: true,
                postData: postData,
            });
        }
    }
});

app.get('/posts', (req, res) => {
    //전체 게시글 조회
    let posts = {};

    db.forEach((value, key) => {
        posts[key] = value;
    });

    res.json(posts);
});

app.delete('/post/:id', (req, res) => {
    //게시글 삭제
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
});

app.delete('/posts', (req, res) => {
    //전체 게시글 삭제
    let msg = '';

    if (db.size > 0) {
        db.clear();
        msg = '전체 게시글을 삭제하였습니다.';
    } else {
        msg = '삭제할 게시글이 없습니다.';
    }
    res.json({
        result: true,
        message: msg,
    });
});

app.put('/post/:id', (req, res) => {
    //게시글 수정
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

app.listen(port, () => {
    console.log(`ChanBoard app listening on port ${port}`);
});
