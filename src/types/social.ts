
export interface Profile {

    uid?: string;
    avatar?: string;
    bio?: string;
    dob?: string;
    cover?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    gender?: string;
    placesWorked?: string;
    maritalStatus?: string;
    originCity?: string,
    highSchool?: string;
    university?: string;
       quote?: string;
    userUrl?: string;

}



export interface Post {


        id: string;
    postId: string;
        avatar: string;
        name: string;
        comments: Comment[];
    createdAt: number;
    isLiked: boolean;
    likes: number;
    media?: string;
    message: string;
}





export interface Comment {
    id: string;
    postId: string;
        avatar: string;
        name: string;
      createdAt: number;
    message: string;
}



