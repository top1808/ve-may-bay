'use client';
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '../../public/images/logo_vna.webp';

const { Header, Footer, Content } = Layout;

const MLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Layout>
			<Header
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					background: '#fff',
					boxShadow: '0 0 1px 1px #888',
				}}
				className='shadow-lg px-2 xl:px-12'
			>
				<Link href='/'>
					<Image
						src={Logo}
						alt='logo_grab'
						width={200}
					/>
				</Link>
			</Header>
			<Content>{children}</Content>
			<Footer className='bg-green-800 text-white'>123</Footer>
		</Layout>
	);
};

export default MLayout;
