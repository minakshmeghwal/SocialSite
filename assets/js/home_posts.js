console.log("hello");
        // method for submit the new form data to ajax
        let createPost=function(){
            let newPostForm=$('#new-post-form');
            newPostForm.submit(function(e)
            {
                e.preventDefault();
                $.ajax({
                    type:'post',
                    url:'/posts/create',
                    data:newPostForm.serialize(),
                    success:function(data)
                    {
                         console.log(data);//posts-list-container>ul it is id of post and in that id <ul>
                            let newPost=newPostDom(data.data.post);
                            $('#posts-list-container>ul').prepend(newPost);
                            deletePost($(' .delete-post-button',newPost));// here we call deletepost who have object of that link which would be delete
                    },
                    error:function(error)
                    {
                        console.log(error.responseText)
                    }
                    
                });
            });
        }
        //method to create a post in dom
        let newPostDom=function(post)
        {
            return $(`<li id="post-${post._id}">
            <p>
                    <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>
                ${post.content}
                <br>
                <small>
                ${post.user.name}  
                </small>
            </p>
            <div class="post-comment">
                

        <form action="/comment/create" method="post">

            <input type="text" name="content" placeholder="comment here">
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add comment">
        </form>
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
            </ul>

        </div>
    </div>
    </li>`)
        }

        //method to delete a post from dom
        let deletePost=function(deleteLink)//we get here deleteLink from above class we give post-delete-button
        {
            $(deleteLink).click(function(e)
            {
                e.prevenDefault();//than we prevent the behaviour of ths naturally and manually deleted
                $.ajax({
                    type:'get',
                    url:$(deleteLink).prop('href'),
                    success:function(data){
                        $(`#post-${data.data.post_id}`).remove();//we get id here from post_controller data where we checkajax request
                    },error:function(error){
                        console.log(error.responseText);
                    }
                })
            })
        }


        createPost();
