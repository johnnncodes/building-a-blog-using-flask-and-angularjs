Blog.factory('Post', function(Restangular) {
    var Post;
    Post = {
        get: function() {
            return Restangular
                .one('posts')
                .getList();
        },
        create: function(data) {
            return Restangular
                .one('posts')
                .customPOST(data);
        }
    };
    return Post;
})