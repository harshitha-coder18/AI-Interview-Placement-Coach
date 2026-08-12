import sqlite3

# Connect to existing database
connection = sqlite3.connect("placement.db")

cursor = connection.cursor()

# Check existing columns
cursor.execute("PRAGMA table_info(questions)")
columns = [column[1] for column in cursor.fetchall()]

print("Existing columns:", columns)


# ============================================
# ADD DIFFICULTY
# ============================================

if "difficulty" not in columns:

    cursor.execute("""
        ALTER TABLE questions
        ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'Easy'
    """)

    print("Added difficulty column.")

else:

    print("difficulty column already exists.")


# ============================================
# ADD STATUS
# ============================================

if "status" not in columns:

    cursor.execute("""
        ALTER TABLE questions
        ADD COLUMN status TEXT NOT NULL DEFAULT 'Not Started'
    """)

    print("Added status column.")

else:

    print("status column already exists.")


# Save changes
connection.commit()

connection.close()

print("Database update completed successfully.")