import type { Post, Profile } from 'src/types/social';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from 'src/libs/firebase';
import { doc, getDoc } from 'firebase/firestore';





type GetPostsRequest = {uid: string; } ;
type GetProfileRequest = { uid?: string; };


class SocialApi {


  async getProfile(request: GetProfileRequest = {}): Promise<Profile> {
    const uid = request.uid;
    if (!uid) {
      return Promise.reject(new Error('No user ID provided for getting profile'));
    }

    const userDocRef = doc(db, 'users', uid);

    return getDoc(userDocRef)
      .then(docSnap => {
        if (!docSnap.exists()) {
          throw new Error('User not found');
        }

        const userData = docSnap.data();

// Place the console.log here to log the retrieved data
        console.log("Profile data from socialApi:", {
          uid: uid,
          ...userData
        });
        const constructedName = `${userData.firstName} ${userData.lastName}`;
        console.log("Constructed name:", constructedName);

        return {
          uid: uid,
          avatar: userData.avatar || '',
          cover: userData.cover || '',
          email: userData.email || '',
          gender: userData.gender || '',
          dob: userData.dob || '',
          name: `${userData.firstName} ${userData.lastName}`,
          originCity: userData.originCity || '',
          placesWorked: userData.placesWorked || '',
          highSchool: userData.highSchool || '',
          university: userData.university || '',
          maritalStatus: userData.maritalStatus || '',
          quote: userData.quote || '',
          userUrl: userData.userUrl || '',
          role: userData.role || '',
          team: []
        };

      });
  }

  async getPosts(request: GetPostsRequest, callback: (posts: Post[]) => void): Promise<() => void> {
    const uid = request.uid;

    if (!uid) {
      throw new Error('No UID provided for listening to posts');
    }

    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, where("uid", "==", uid));

    const unsubscribe = onSnapshot(q, snapshot => {
      if (snapshot.empty) {
        callback([]);
        return;
      }

      const posts: Post[] = snapshot.docs.map(doc => {
        const postData = doc.data();
        return {
          id: doc.id,
          postId: postData.postId,  // Add this
          avatar: postData.avatar,  // Add this
          name: postData.name,  // Add this
          author: {
            id: postData.uid,
            avatar: postData.avatar,
            name: postData.name,
          },
            comments: postData.comments || [],

            createdAt: postData.createdAt,
          isLiked: postData.isLiked || false,
          likes: postData.likes || 0,
          media: postData.media,
          message: postData.message,

        };
      });

        console.log("Fetched Posts:", posts);

        callback(posts);
    }, error => {
      console.error("Error fetching posts:", error);
    });
    return unsubscribe;
  }

}

  export const socialApi = new SocialApi();
