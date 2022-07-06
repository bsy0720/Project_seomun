var express = require('express');
var router = express.Router();

const {
    check,
    validationResult
} = require('express-validator');

const db = require('../db.js');
// const express = require('express');
var expressLayouts = require('express-ejs-layouts');

// const router = express.Router();

router.use(expressLayouts);
//route, routing
router.get('/', (req, res) => {
    res.render('seomun_main');
    //서문시장야시장의 메인페이지를 지정! 
});

router.get('/introduce', (req, res) => {
    res.render('seomun_introduce');
});

// 목록페이지 부르는거
router.get('/seomun_notice', (req, res) => {
    db.getAllMemos((rows) => {
        res.render('seomun_notice', {
            rows: rows
        });
    });
});

// 작성페이지
router.post('/store',
    [check('content').isLength({
        min: 1,
        max: 6000
    })],
    function (req, res, next) {
        let errs = validationResult(req);
        console.log(errs);
        if (errs['errors'].length > 0) { //에러출력
            res.render('notice_write', {
                errs: errs['errors']
            });
        } else {
            let param = JSON.parse(JSON.stringify(req.body));
            let title = param['title'];
            let pw = param['pw'];
            //let s_update = param['s_update'];
            let content = param['content'];
            db.insertMemo(title, pw, content, () => {
                res.redirect('/seomun_notice');
            });
        }
    });

// 공지사항 썼던걸 불러오는거
router.get('/new', (req, res) => { // 이쪽의 /new는 공지사항수정페이지 form action의 이름
    let id = req.query.id;
    db.getMemoById(id, (row) => {
        if (typeof id == 'undefined' || row.length <= 0) {
            res.status(404).json({
                error: 'undefined memo'
            });
        } else {
            res.render('new_notice_write', {
                row: row[0]
            });
        }
    })
});

// 공지사항수정페이지 부르는거
router.get('/new_notice_write', (req, res) => {
    res.render('new_notice_write');
});

// 공지사항 수정한걸 보내는거
router.post('/new', [check('content').isLength({
    min: 1,
    max: 6000
})], (req, res) => { // 수정
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    let id = param['id'];
    let title = param['title'];
    let pw = param['pw'];
    let s_update = param['s_update'];
    let content = param['content'];
    if (errs['errors'].length > 0) {
        db.getMemoById(id, (row) => {
            res.render('new_notice_write', {
                row: row[0],
                errs: errs['errors']
            })
        })
    } else {
        db.updateMemoById(id, title, pw, s_update, content, () => {
            res.redirect('/seomun_notice')
        })
    }
});


// 공지사항 삭제
router.get('/deleteNotice', (req, res) => {
    let id = req.query.id;
    db.deleteMemoById(id, () => {
        res.redirect('/seomun_notice'); // 공지사항 목록페이지로 다시 보여주는거
    });
});

// 공지사항 페이지네이션
router.get("/notice/:page", (req, res, next) => {
    let page = req.params.page;
    db.getAllMemos((rows) => {
        res.render('seomun_notice', {
            rows: rows,
            count: count,
            page: page,
            leng: Object.keys(rows).length - 1,
            pageNum: 8,
            pass: true
        });
    });
});



router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/law', (req, res) => {
    res.render('law');
});

router.get('/food', (req, res) => {
    res.render('food_join');
});

router.get('/market', (req, res) => {
    res.render('market_join');
});

router.get('/seomun_notice_page', (req, res) => { // 
    let id = req.query.id;
    db.getMemoById(id, (row) => {
        if (typeof id == 'undefined' || row.length <= 0) {
            res.status(404).json({
                error: 'undefined memo'
            });
        } else {
            res.render('seomun_notice_page', {
                row: row[0]
            });
        }
    })
});

router.get('/sub', (req, res) => {
    res.render('sub_nav');
});

router.get('/sub2', (req, res) => {
    res.send("sub2");
});



router.get('/write', (req, res) => {
    res.render('notice_write');
});


module.exports = router;