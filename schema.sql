create table if not exists posts (
  id serial primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  kind text not null default 'blog',         -- blog | journal | article | image | video
  media_url text,
  tags text[] not null default '{}',
  published boolean not null default false,  -- false = draft
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_pub_idx on posts (published, created_at desc);

create table if not exists messages (
  id serial primary key,
  name text not null, email text not null, message text not null,
  created_at timestamptz not null default now()
);