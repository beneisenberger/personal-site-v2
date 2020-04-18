import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Post {
    id?: string
    title: string
    author: string
    authorImage: string
    authorId: string
    content: string
    image: string
    published: Timestamp | Date
}

export interface Comment {
    id?: string
    author: string
    authorId: string
    authorImage: string
    content: string
    postId: string
    published: Timestamp | Date
}

export interface Form {
    email: string
    checked: boolean
    name: string
    message: string
}