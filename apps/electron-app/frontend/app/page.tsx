'use client'

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

declare global {
  interface Window {
    dbAPI: {
      getUsers: () => Promise<User[]>;
      addUser: (name: string) => Promise<void>;
    };
  }
}

export default function Home() {

  return (
    <main>
      <Container />
    </main>
  );
}

const FeatureCard = ({ iconSvg, name, desc }: any) => {
  return (
    <Box className="flex-column border border-w-1 border-outline-700 flex-1 m-2 p-4 rounded">
      <Box className="items-center flex flex-row">
        <Image
          src={`/${iconSvg}`}
          alt="document"
          priority
          width={22}
          height={22}
        />
        <Text className="text-typography-white font-medium ml-2 text-xl">
          {name}
        </Text>
      </Box>
      <Text className="text-typography-400 mt-2">{desc}</Text>
    </Box>
  );
};

const Container = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    window.dbAPI.getUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    console.log("clicked")
    const name = "user";
    if (name) {
      window.dbAPI.addUser(name).then(() => {
        window.dbAPI.getUsers().then(setUsers);
      });
    }
  };

  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <Box className="absolute h-[500px] w-[500px] lg:w-[700px] lg:h-[700px]">
        <Image src="/gradient.svg" alt="Gradient" fill priority />
      </Box>
      <Box className="flex flex-1 items-center my-16 mx-5 lg:my-24 lg:mx-32">
        <Box className="py-2 px-6 rounded-full items-center flex-column sm:flex-row md:self-start">
           <Box className='flex-column'>

            <Button variant='outline' onPress={handleAddUser} className='hover:backgroun-color:black'>
              <ButtonText className='text-typography-white'>Add User</ButtonText>
            </Button>

            <Text className='text-typography-white font-medium ml-2'>
              {users.map(user => (
                <Text key={user.id} className='text-typography-white font-medium ml-2'>{user.name} (ID: {user.id})</Text>
              ))}
            </Text>
           </Box>
        </Box>
      </Box>
    </Box>
  );
};
