'use client';

import { BackIcon, GlobeIcon, CategoryIcon, MailIcon, CameraIcon, PlusIcon,ProfileIcon, CheckmarkIcon, TrashIcon, EditIcon, SearchIcon } from '../shared/ui/Icon';

export default function Home() {
  return (
    <main style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ marginBottom: '30px' }}>Демонстрация иконок</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '30px',
        marginBottom: '50px'
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #eee', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <BackIcon size={32} />
          <p>BackIcon</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <ProfileIcon size={24} color="red" />
            <CheckmarkIcon size={24} color="red" />
            <TrashIcon size={24} color="red" />
            <EditIcon size={24} color="red" />
            <SearchIcon size={24} color="red" />
            <BackIcon size={24} color="blue" />
            <BackIcon size={24} color="blue" />
            <BackIcon size={24} color="blue" />
            
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #eee', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <GlobeIcon size={32} />
          <p>GlobeIcon</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <GlobeIcon size={24} color="red" strokeWidth={1} />
            <GlobeIcon size={24} color="green" strokeWidth={2} />
            <GlobeIcon size={24} color="blue" strokeWidth={3} />
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #eee', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CategoryIcon size={32} />
          <p>CategoryIcon</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CategoryIcon size={24} color="red" />
            <CategoryIcon size={24} color="green" />
            <CategoryIcon size={24} color="blue" />
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #eee', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <MailIcon size={32} color="black" />
          <p>MailIcon</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <MailIcon size={24} color="red" />
            <MailIcon size={24} color="green" />
            <MailIcon size={24} color="blue" />
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #eee', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CameraIcon size={40} />
          <p>CameraIcon</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CameraIcon size={24} color="red" />
            <CameraIcon size={24} color="green" />
            <CameraIcon size={24} color="blue" />
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #eee', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <PlusIcon size={32} />
          <p>PlusIcon</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PlusIcon size={24} color="red" />
            <PlusIcon size={24} color="green" />
            <PlusIcon size={24} color="blue" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '20px' }}>Различные размеры</h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <BackIcon size={16} />
          <BackIcon size={24} />
          <BackIcon size={32} />
          <BackIcon size={48} />
          <BackIcon size={64} />
        </div>
      </div>
    </main>
  );
}