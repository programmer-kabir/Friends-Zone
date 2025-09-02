import { auth } from '@/src/auth';
import Logout from '@/src/components/Logout';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const Setting = async() => {
    const session = await auth()
    console.log(session?.user);
    if (!session?.user) redirect("/signin");
    return (
        <div className="flex flex-col items-center m-4">
            <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
            />
            <Logout />
        </div>
    );
};

export default Setting;