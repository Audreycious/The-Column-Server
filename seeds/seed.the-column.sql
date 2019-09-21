BEGIN;

TRUNCATE comments, articles, users RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, email, username, password)
VALUES
    ('1', 'Audrey', 'Porcupine4@gmail.com', 'Audrey', 'Audrey'),
    ('2', 'Danielle', 'meercatnip@gmail.com', 'Danielle', 'Danielle');

INSERT INTO articles (id, headline, print, user_id, created)
VALUES
    ('1', 'Ink me up!!', 'What should I get for my next tattoo?', '1', '1/1/19'), 
    ('2', 'The cowboys are the worst team of all possible sports teams', 'Fight me if you disagree', '1', '1/1/19'), 
    ('3', 'Cloning for everyone', 'I don''t think it''s controversial at all and we should all have at least 10 of us', '2', '1/1/19'),
    ('4', 'What should I name my baby?', 'I think it''s going to be a boy, but not sure. Whats a good name? I like things that start with L, K, and J','1', '1/1/19'),
    ('5', 'AMA', 'I''m a millionaire child surgeon who invented a new type of heart surgery. AMA', '2', '1/1/19');

INSERT INTO comments (id, article_id, user_id, comment)
VALUES
    ('1', '1', '1', 'A spider!'), 
    ('2', '1', '2', 'Something dumb!'),
    ('3', '1', '2', 'Idk, I''m nervous!'),
    ('4', '2', '1', 'I''ll fight you!'),
    ('5', '2', '2', 'It''s definitely the Eagles'),
    ('6', '3', '1', 'I already have 3!'),
    ('7', '3', '1', 'This is strange...'), 
    ('8', '3', '2', 'Are you a cloning scientist?'),
    ('9', '4', '1', 'How about LaKingJa?'),
    ('10', '4', '1', 'Leon!'),
    ('11', '4', '2', 'Kyal'),
    ('12', '4', '2', 'Jason!'),
    ('13', '4', '2', 'You gotta pick Julion'),
    ('14', '5', '2', 'So are you a child who is a surgeon?'),
    ('15', '5', '1', 'No, I do surgery on children'),
    ('16', '5', '2', 'And you''re a child?'),
    ('17', '5', '1', 'That is beside the point, stop asking'),
    ('18', '5', '2', 'Is that a yes???');

COMMIT;