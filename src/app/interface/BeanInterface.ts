interface UserInterface{
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    password: String;
    typeuser_obj: UsertypeInterface;
    usertype_id: Number;
}

interface UsertypeInterface{
    id: number;
    desc: String;
}

interface ReviewlistInterface{
    id: number;
    title: String;
    author_id: UserInterface;
    employee_id: UserInterface;
}

interface ReviewInterface{
    id: number;
    rating: number;
    comment: String;
    submitted: boolean;
    user_id: UserInterface;
    reviewlist_id: ReviewInterface;
}

interface ResponseInterface{
    status: number;
    message: any;
}