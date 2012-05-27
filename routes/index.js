
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ToDo App in NodeJS + MongoDB' })
};